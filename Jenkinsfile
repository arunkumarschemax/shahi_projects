pipeline {
      agent {label 'agentlinux'}
	  
	  stages {
	        stage ("check version") {
			steps {
			     sh "node -v"
				 sh "npm -v"
		    } 
		}
		stage("Install Dependencies") {
            steps {
                sh "npm install"
            }
		}
	}
}
