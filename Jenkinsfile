pipeline {
    agent { label 'agentlinux' }
    stages {
        stage("Check Version") {
            steps {
                sh "node -v"
                sh "npm -v"
            }
        }
  
        stage('Build') {
            steps {
                git branch: 'test_levis', credentialsId: '3', url: 'https://gitlab.com/dileepraghumajji88/shahi-projects.git'
                sh 'npm install'
                sh 'ls -l /var/lib/jenkins/workspace/pipeline/gtstoinfor/node_modules/nx/bin' // List contents of the directory
                sh '/var/lib/jenkins/workspace/pipeline/gtstoinfor/node_modules/nx/bin/nx run services-common:build'
            }
        }
    }
}
