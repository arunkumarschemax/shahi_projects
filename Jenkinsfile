pipeline {
    agent { label 'agentlinux' }
    stages {
        stage("Check Version") {
            steps {
                sh "node -v"
                sh "npm -v"
            }
        }
  
        stage('Install dependencies') {
            steps {
                sh 'npm install'
                sh 'npm install @nrwl/cli' // Install Nx using npm
            }
        }

        stage('Build') {
            steps {
                git branch: 'test_levis', credentialsId: '3', url: 'https://gitlab.com/dileepraghumajji88/shahi-projects.git'
                sh 'cd /var/lib/jenkins/workspace/pipeline/gtstoinfor/node_modules/nx/bin/'
                sh 'nx run build'
            }
        }
    }
}
