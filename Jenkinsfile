pipeline {
      agent {label 'agentlinux'}
	  stages{
          stage("Install Dependencies") {
            steps {
                dir('/var/lib/jenkins/workspace/pipeline') {
                    sh "npm install"
                }
            }
        }
      }
		
		
	}
