node {

    def app 
    
    environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub')
	}

    stage('Git Clone'){
       git branch: 'main', credentialsId: 'GITHUB_CREDENTIALS', url:"https://github.com/olivrrrrr/jenkins_docker_test"
    }


     stage('Build docker Image'){
      app = docker.build("oliverxekwalla/dockerdemo")
    }



}