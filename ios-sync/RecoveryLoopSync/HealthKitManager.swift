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
        print("Starting to fetch health data...")
        
        let calendar = Calendar.current
        // Get data from the last 7 days
        let endDate = Date()
        let startDate = calendar.date(byAdding: .day, value: -7, to: endDate)!
        
        print("Fetching data from \(startDate) to \(endDate)")
        
        let group = DispatchGroup()
        var healthData: [String: Any] = [:]
        
        // Fetch VO2 Max
        group.enter()
        fetchVO2Max(startDate: startDate, endDate: endDate) { results, error in
            if let error = error {
                print("Error fetching VO2 Max: \(error)")
            }
            if let results = results {
                print("Found \(results.count) VO2 Max records")
                healthData["vo2Max"] = results
            }
            group.leave()
        }
        
        // Fetch Active Energy
        group.enter()
        fetchActiveEnergy(startDate: startDate, endDate: endDate) { results, error in
            if let error = error {
                print("Error fetching Active Energy: \(error)")
            }
            if let results = results {
                print("Found \(results.count) Active Energy records")
                healthData["activeEnergy"] = results
            }
            group.leave()
        }
        
        // Fetch Sleep Analysis
        group.enter()
        fetchSleepAnalysis(startDate: startDate, endDate: endDate) { results, error in
            if let error = error {
                print("Error fetching Sleep Analysis: \(error)")
            }
            if let results = results {
                print("Found \(results.count) Sleep Analysis records")
                healthData["sleepAnalysis"] = results
            }
            group.leave()
        }
        
        group.notify(queue: .main) {
            do {
                let jsonData = try JSONSerialization.data(withJSONObject: healthData)
                print("Successfully serialized health data")
                completion(jsonData, nil)
            } catch {
                print("Error serializing health data: \(error)")
                completion(nil, error)
            }
        }
    }
    
    private func fetchVO2Max(startDate: Date, endDate: Date, completion: @escaping ([[String: Any]]?, Error?) -> Void) {
        let vo2MaxType = HKQuantityType.quantityType(forIdentifier: .vo2Max)!
        let predicate = HKQuery.predicateForSamples(withStart: startDate, end: endDate, options: .strictStartDate)
        
        let query = HKSampleQuery(sampleType: vo2MaxType,
                                predicate: predicate,
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
    
    private func fetchActiveEnergy(startDate: Date, endDate: Date, completion: @escaping ([[String: Any]]?, Error?) -> Void) {
        let energyType = HKQuantityType.quantityType(forIdentifier: .activeEnergyBurned)!
        let predicate = HKQuery.predicateForSamples(withStart: startDate, end: endDate, options: .strictStartDate)
        
        let query = HKSampleQuery(sampleType: energyType,
                                predicate: predicate,
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
    
    private func fetchSleepAnalysis(startDate: Date, endDate: Date, completion: @escaping ([[String: Any]]?, Error?) -> Void) {
        let sleepType = HKObjectType.categoryType(forIdentifier: .sleepAnalysis)!
        let predicate = HKQuery.predicateForSamples(withStart: startDate, end: endDate, options: .strictStartDate)
        
        let query = HKSampleQuery(sampleType: sleepType,
                                predicate: predicate,
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
        // Update the URL to your Vercel deployment
        guard let url = URL(string: "https://loganszeto.vercel.app/api/health/sync") else {
            completion(NSError(domain: "Invalid URL", code: -1))
            return
        }
        
        print("Sending data to server...")
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = data
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                print("Network error: \(error)")
                completion(error)
                return
            }
            
            guard let httpResponse = response as? HTTPURLResponse else {
                print("Invalid response type")
                completion(NSError(domain: "Invalid response", code: -1))
                return
            }
            
            print("Server response status: \(httpResponse.statusCode)")
            
            if let data = data, let responseString = String(data: data, encoding: .utf8) {
                print("Server response: \(responseString)")
            }
            
            if !(200...299).contains(httpResponse.statusCode) {
                completion(NSError(domain: "Server error", code: httpResponse.statusCode))
                return
            }
            
            completion(nil)
        }.resume()
    }
} 