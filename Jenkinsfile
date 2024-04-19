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
                // Assuming NX is installed locally within the project
                dir('/var/lib/jenkins/workspace/pipeline') {
                    sh "./node_modules/.bin/nx run services-common:build"
                }
            }
        }
    }
}
