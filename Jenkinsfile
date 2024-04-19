pipeline {
    agent { label 'agentlinux' }

    stages {
        stage("Check Version") {
            steps {
                sh "node -v"
                sh "npm -v"
            }
        }
        
        stage("Install Dependencies") {
            steps {
                // Change directory to the desired location
                dir('/var/lib/jenkins/workspace/pipeline/gtstoinfor') {
                    // Run npm install to install dependencies
                    sh "npm install"
                }
            }
        }
    }
}