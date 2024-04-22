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
                sh 'npm install --force'
                sh 'npm install -g nx@latest --force'
            }
        }
    }
}
    