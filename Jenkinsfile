pipeline {
      agent {label 'agentlinux'}
	  
	  stages {
	        stage ("check version") {
			steps {
			     sh "node -v"
				 sh "npm -v"
		        } 
		}
	}
