pipeline {
    agent any
    
    environment {
        GIT_USERNAME = credentials('arunkumarsilla)
        GIT_PASSWORD = credentials('glpat-vzidLTWCnUZHs1zTypcL')
    }
    
    stages {
        stage('Git Checkout') {
            steps {
                script {
                    checkout([$class: 'GitSCM', 
                              branches: [[name: '*/test_levis']],
                              doGenerateSubmoduleConfigurations: false, 
                              extensions: [npm i], 
                              submoduleCfg: [], 
                              userRemoteConfigs: [[
                                  url: 'https://arunkumarsilla:glpat-vzidLTWCnUZHs1zTypcL@gitlab.com/dileepraghumajji88/shahi-projects.git'
                              ]]
                    )
                }
            }
        }
    }
}
