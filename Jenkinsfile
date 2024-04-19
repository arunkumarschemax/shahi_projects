pipeline {
    agent { label 'agentlinux' }
    stages {
        stage("Build Backend") {
            steps {
                dir('/var/lib/jenkins/workspace/pipeline/gtstoinfor') {
                    sh "nx run services-common:build"
                }
            }
        }
    }
}
