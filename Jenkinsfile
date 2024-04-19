pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                dir('/var/lib/jenkins/workspace/pipeline') {
                    sh 'npm install'
                }
            }
        }
        stage('Build Backend') {
            steps {
                dir('/var/lib/jenkins/workspace/pipeline') {
                    sh './node_modules/.bin/nx run services-common:build'
                }
            }
        }
    }
}
