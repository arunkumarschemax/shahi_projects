pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from Git
                git branch: 'test_levis', url: 'https://gitlab.com/dileepraghumajji88/shahi-projects.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Change to the directory where package.json is located
                dir('/var/lib/jenkins/workspace/pipeline/gtstoinfor') {
                    // Install Node.js dependencies
                    sh 'npm install'
                }
            }
        }

        stage('Build Backend') {
            steps {
                // Change to the directory where nx.json is located
                dir('/var/lib/jenkins/workspace/pipeline/gtstoinfor') {
                    // Run the build command using NX CLI
                    sh './node_modules/.bin/nx run services-common:build'
                }
            }
        }
    }

    post {
        success {
            // If the build is successful, you can perform additional actions here
            echo 'Build successful!'
        }
        failure {
            // If the build fails, you can perform additional actions here
            echo 'Build failed!'
        }
    }
}
