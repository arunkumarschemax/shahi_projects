pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Version') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('gtstoinfor') {
                    sh 'npm cache clean --force'
                    sh 'npm install'
                }
            }
        }
    }
}
