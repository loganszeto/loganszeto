import SwiftUI

struct ContentView: View {
    @State private var isAuthorized = false
    @State private var isSyncing = false
    @State private var lastSync: Date?
    @State private var errorMessage: String?
    
    let healthKitManager = HealthKitManager()
    
    var body: some View {
        NavigationView {
            VStack(spacing: 20) {
                if !isAuthorized {
                    Text("The Recovery Loop needs access to your health data to sync with the dashboard.")
                        .multilineTextAlignment(.center)
                        .padding()
                    
                    Button("Authorize Health Access") {
                        requestHealthKitAuthorization()
                    }
                    .buttonStyle(.borderedProminent)
                } else {
                    VStack(alignment: .leading, spacing: 10) {
                        if let lastSync = lastSync {
                            Text("Last synced: \(lastSync.formatted())")
                        }
                        
                        if let error = errorMessage {
                            Text(error)
                                .foregroundColor(.red)
                                .padding()
                        }
                        
                        Button(isSyncing ? "Syncing..." : "Sync Now") {
                            syncHealthData()
                        }
                        .buttonStyle(.borderedProminent)
                        .disabled(isSyncing)
                    }
                    .padding()
                }
            }
            .navigationTitle("Recovery Loop Sync")
        }
    }
    
    private func requestHealthKitAuthorization() {
        healthKitManager.requestAuthorization { success, error in
            DispatchQueue.main.async {
                if success {
                    isAuthorized = true
                } else {
                    errorMessage = error?.localizedDescription ?? "Failed to authorize Health access"
                }
            }
        }
    }
    
    private func syncHealthData() {
        isSyncing = true
        errorMessage = nil
        
        healthKitManager.fetchLatestData { data, error in
            if let data = data {
                healthKitManager.syncToServer(data: data) { error in
                    DispatchQueue.main.async {
                        isSyncing = false
                        if let error = error {
                            errorMessage = error.localizedDescription
                        } else {
                            lastSync = Date()
                        }
                    }
                }
            } else {
                DispatchQueue.main.async {
                    isSyncing = false
                    errorMessage = error?.localizedDescription ?? "Failed to fetch health data"
                }
            }
        }
    }
} 