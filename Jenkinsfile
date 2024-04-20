pipeline {
    agent { label 'agentlinux' }
    tools {nodejs "node"}
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
                }
            }
        }
    }