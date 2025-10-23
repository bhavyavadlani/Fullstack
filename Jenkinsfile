pipeline {
    agent any

    environment {
        TOMCAT_HOME = "/Users/vadlanibhavya/Downloads/apache-tomcat-10.1.43"
        PATH = "/opt/homebrew/bin:${env.PATH}"
    }

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('PetFrontend') {
                    sh '''
                    npm install
                    npm run build
                    '''
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                sh '''
                REACT_DEPLOY_DIR="${TOMCAT_HOME}/webapps/task"

                if [ -d "$REACT_DEPLOY_DIR" ]; then
                    rm -rf "$REACT_DEPLOY_DIR"
                fi

                mkdir -p "$REACT_DEPLOY_DIR"
                cp -R PetFrontend/dist/* "$REACT_DEPLOY_DIR"
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('PetBackend') {
                    sh '''
                    mvn clean package
                    '''
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                sh '''
                WAR_PATH="${TOMCAT_HOME}/webapps/taskapi.war"
                WAR_DIR="${TOMCAT_HOME}/webapps/taskapi"

                rm -f "$WAR_PATH"
                rm -rf "$WAR_DIR"

                cp PetBackend/target/*.war "$TOMCAT_HOME/webapps/"
                '''
            }
        }

        // ===== RESTART TOMCAT =====
        stage('Restart Tomcat') {
            steps {
                sh '''
                echo "Restarting Tomcat..."
                "$TOMCAT_HOME/bin/shutdown.sh" || true
                sleep 5
                "$TOMCAT_HOME/bin/startup.sh"
                '''
            }
        }

    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed..'
        }
    }
}
