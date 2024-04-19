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
                sh "npm install --force"
            }
		}
		stage("Build Frontend") {
            steps {
                sh "npx nx run ui:build"
            }
        }
	}
}
