pipeline {
      agent {label 'agentlinux'}
	  stage{
          stage("Install Dependencies") {
            steps {
                dir('/var/www/html/automation/gtstoinfor') {
                    sh "npm install"
                }
            }
        }
      }
		
		
	}
