pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install dependencies') {
            steps {
                script {
                        sh 'npm install --force'
                        sh 'npm install -g @nrwl/cli --force'
                    }
                }
            }
        
        stage('Build') {
            steps {
                script {
                    
                        sh './nx run services-common:build'
                    
                }
            }
        }
    }
}
