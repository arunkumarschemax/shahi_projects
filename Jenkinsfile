pipeline {
    agent any
    
    stages {
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
                
                sh 'cd /var/lib/jenkins/workspace/pipeline'
                sh '/jenkins/.nvm/versions/node/v18.16.0/lib/nx run services-common:build'
                
            }
        }
    }
}
