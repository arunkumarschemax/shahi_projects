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
         stage("Build Backend") {
            steps {
                // Adding the directory change to the location where nx command is available
                dir('/var/lib/jenkins/workspace/pipeline/gtstoinfor') {
                    // Assuming NX is installed locally within the project
                    sh "./node_modules/.bin/nx run services-common:build"
                    // If NX is installed globally, you can use the following line instead
                    // sh "nx run services-common:build"
                }
            }
        }
    }
}
