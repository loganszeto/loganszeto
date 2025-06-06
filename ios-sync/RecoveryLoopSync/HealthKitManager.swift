import HealthKit
import Foundation

class HealthKitManager {
    let healthStore = HKHealthStore()
    
    // The types of data we want to read
    let typesToRead: Set<HKObjectType> = [
        HKObjectType.quantityType(forIdentifier: .vo2Max)!,
        HKObjectType.quantityType(forIdentifier: .activeEnergyBurned)!,
        HKObjectType.categoryType(forIdentifier: .sleepAnalysis)!
    ]
    
    func requestAuthorization(completion: @escaping (Bool, Error?) -> Void) {
        healthStore.requestAuthorization(toShare: nil, read: typesToRead) { success, error in
            completion(success, error)
        }
    }
    
    func fetchLatestData(completion: @escaping (Data?, Error?) -> Void) {
        let group = DispatchGroup()
        var healthData: [String: Any] = [:]
        
        // Fetch VO2 Max
        group.enter()
        fetchVO2Max { results, error in
            if let results = results {
                healthData["vo2Max"] = results
            }
            group.leave()
        }
        
        // Fetch Active Energy
        group.enter()
        fetchActiveEnergy { results, error in
            if let results = results {
                healthData["activeEnergy"] = results
            }
            group.leave()
        }
        
        // Fetch Sleep Analysis
        group.enter()
        fetchSleepAnalysis { results, error in
            if let results = results {
                healthData["sleepAnalysis"] = results
            }
            group.leave()
        }
        
        group.notify(queue: .main) {
            do {
                let jsonData = try JSONSerialization.data(withJSONObject: healthData)
                completion(jsonData, nil)
            } catch {
                completion(nil, error)
            }
        }
    }
    
    private func fetchVO2Max(completion: @escaping ([[String: Any]]?, Error?) -> Void) {
        let vo2MaxType = HKQuantityType.quantityType(forIdentifier: .vo2Max)!
        let query = HKSampleQuery(sampleType: vo2MaxType,
                                predicate: nil,
                                limit: HKObjectQueryNoLimit,
                                sortDescriptors: [NSSortDescriptor(key: HKSampleSortIdentifierStartDate, ascending: true)]) { query, samples, error in
            guard let samples = samples as? [HKQuantitySample], error == nil else {
                completion(nil, error)
                return
            }
            
            let results = samples.map { sample -> [String: Any] in
                return [
                    "date": ISO8601DateFormatter().string(from: sample.startDate),
                    "value": sample.quantity.doubleValue(for: HKUnit.literUnit(with: .mole).unitDivided(by: .gramUnit(with: .kilo).unitMultiplied(by: .minuteUnit)))
                ]
            }
            
            completion(results, nil)
        }
        
        healthStore.execute(query)
    }
    
    private func fetchActiveEnergy(completion: @escaping ([[String: Any]]?, Error?) -> Void) {
        let energyType = HKQuantityType.quantityType(forIdentifier: .activeEnergyBurned)!
        let query = HKSampleQuery(sampleType: energyType,
                                predicate: nil,
                                limit: HKObjectQueryNoLimit,
                                sortDescriptors: [NSSortDescriptor(key: HKSampleSortIdentifierStartDate, ascending: true)]) { query, samples, error in
            guard let samples = samples as? [HKQuantitySample], error == nil else {
                completion(nil, error)
                return
            }
            
            let results = samples.map { sample -> [String: Any] in
                return [
                    "date": ISO8601DateFormatter().string(from: sample.startDate),
                    "value": sample.quantity.doubleValue(for: .kilocalorie())
                ]
            }
            
            completion(results, nil)
        }
        
        healthStore.execute(query)
    }
    
    private func fetchSleepAnalysis(completion: @escaping ([[String: Any]]?, Error?) -> Void) {
        let sleepType = HKObjectType.categoryType(forIdentifier: .sleepAnalysis)!
        let query = HKSampleQuery(sampleType: sleepType,
                                predicate: nil,
                                limit: HKObjectQueryNoLimit,
                                sortDescriptors: [NSSortDescriptor(key: HKSampleSortIdentifierStartDate, ascending: true)]) { query, samples, error in
            guard let samples = samples as? [HKCategorySample], error == nil else {
                completion(nil, error)
                return
            }
            
            let results = samples.map { sample -> [String: Any] in
                return [
                    "startDate": ISO8601DateFormatter().string(from: sample.startDate),
                    "endDate": ISO8601DateFormatter().string(from: sample.endDate),
                    "value": sample.value == HKCategoryValueSleepAnalysis.inBed.rawValue ? "INBED" :
                            sample.value == HKCategoryValueSleepAnalysis.asleep.rawValue ? "ASLEEP" : "AWAKE"
                ]
            }
            
            completion(results, nil)
        }
        
        healthStore.execute(query)
    }
    
    func syncToServer(data: Data, completion: @escaping (Error?) -> Void) {
        guard let url = URL(string: "https://your-website.com/api/health/sync") else {
            completion(NSError(domain: "Invalid URL", code: -1))
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = data
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            completion(error)
        }.resume()
    }
} 