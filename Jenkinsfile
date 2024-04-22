pipeline {
    agent any
    
    stages {
        stage('Checkout SCM') {
            steps {
                checkout([$class: 'GitSCM', 
                          branches: [[name: 'test_levis']], 
                          doGenerateSubmoduleConfigurations: false, 
                          extensions: [], 
                          submoduleCfg: [], 
                          userRemoteConfigs: [[url: 'https://gitlab.com/dileepraghumajji88/shahi-projects.git']]])
            }
        }
        
        stage('Check Version') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }
        
        stage('Install dependencies') {
            steps {
                sh 'npm install'
                sh 'npm install @nrwl/cli'
            }
        }
        
        stage('Build') {
            steps {
                checkout([$class: 'GitSCM', 
                          branches: [[name: 'test_levis']], 
                          doGenerateSubmoduleConfigurations: false, 
                          extensions: [], 
                          submoduleCfg: [], 
                          userRemoteConfigs: [[url: 'https://gitlab.com/dileepraghumajji88/shahi-projects.git']]])
                
                sh 'cd /var/lib/jenkins/workspace/pipeline/gtstoinfor/'
                sh 'pwd'
                // Additional build steps can be added here
            }
        }
    }
}
