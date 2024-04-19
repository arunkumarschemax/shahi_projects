pipeline {
    agent { label 'agentlinux' }

    stages {
        stage("Check Version") {
            steps {
                sh "node -v"
                sh "npm -v"
            }
        }
    }
}