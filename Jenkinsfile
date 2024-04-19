pipeline {
      agent {label 'agentlinux'}
	  
		stage("Install Dependencies") {
            steps {
                dir('/var/www/html/automation/gtstoinfor') {
                    sh "npm install"
                }
            }
        }
		
	}
