pipeline {
      agent {label 'agentlinux'}
	  stages{
          stage("Install Dependencies") {
            steps {
                dir('/var/www/html/automation/gtstoinfor') {
                    sh "npm install"
                }
            }
        }
      }
		
		
	}
