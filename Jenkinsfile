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
                    // Change directory to where package.json is located
                    dir('/var/lib/jenkins/workspace/pipeline/gtstoinfor/') {
                        // Install npm dependencies
                        sh 'npm install'
                    }
                }
            }
        }
        
        stage('Build') {
            steps {
                script {
                    // Change directory to where nx is installed (adjust the path accordingly)
                    dir('/var/lib/jenkins/workspace/pipeline/node_modules/.bin') {
                        // Run nx build command
                        sh './nx run services-common:build'
                    }
                }
            }
        }
    }
}
