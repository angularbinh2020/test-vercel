pipeline {
  agent any
  tools {nodejs "nodejs16"}
  stages {
    stage('Build') {
        steps {
          sh 'npm install react-scripts --legacy-peer-deps'
          sh 'npm run build'
        }
    }
    stage('Copy') {
        steps {
          sshagent(['MogiviClient']) {   
            echo "${WORKSPACE}"
            sh 'ssh -o StrictHostKeyChecking=no -l centos 54.254.77.184 rm -rf /home/multisite-cms/web/.next rm -rf /home/multisite-cms/web/node_modules rm -rf /home/multisite-cms/web/public rm -rf /home/multisite-cms/web/.env rm -rf /home/multisite-cms/web/package.json'
            sh "scp -r ${WORKSPACE}/.next/standalone/node_modules centos@54.254.77.184:/home/projects/mogivi.vn/web/"  
            sh "scp -r ${WORKSPACE}/.next/standalone/.next centos@54.254.77.184:/home/projects/mogivi.vn/web/"  
            sh "scp ${WORKSPACE}/.next/standalone/.env centos@54.254.77.184:/home/projects/mogivi.vn/web/"  
            sh "scp ${WORKSPACE}/.next/standalone/package.json centos@54.254.77.184:/home/projects/mogivi.vn/web/"  
            sh "scp ${WORKSPACE}/.next/standalone/server.js centos@54.254.77.184:/home/projects/mogivi.vn/web/"  
            sh "scp -r ${WORKSPACE}/.next/static centos@54.254.77.184:/home/projects/mogivi.vn/web/.next"  
            sh "scp -r ${WORKSPACE}/public centos@54.254.77.184:/home/projects/mogivi.vn/web/"  
            
            sh 'ssh -o StrictHostKeyChecking=no -l centos 54.254.77.184 docker rm -f mgv_multisite_web mgv_multisite_proxy'
            sh 'ssh -o StrictHostKeyChecking=no -l centos 54.254.77.184 docker-compose -f /home/projects/mogivi.vn/docker-compose.yml up --build -d'
            //sh 'ssh -o StrictHostKeyChecking=no -l centos 54.254.77.184 docker rmi $(docker images -f "dangling=true" -q) --force'
          }
        }
    }
  }
}
