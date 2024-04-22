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
                sh '/var/lib/jenkins/workspace/pipeline/gtstoinfor/node_modules/nx/nx run services-common:build'
            }
        }
    }
}
