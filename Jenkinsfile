pipeline {
    agent { label 'agentlinux' }
    stages {
        stage("Install Dependencies") {
            steps {
                dir('/var/lib/jenkins/workspace/pipeline') {
                    sh "npm install"
                }
            }
        }
        stage("Build Backend") {
            steps {
                dir('/var/lib/jenkins/workspace/pipeline') {
                    sh "nx run services-common:build"
                }
            }
        }
    }
}
