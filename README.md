# MTCAcademyMicroservices-Lab2

Prerequisitos: 
* Azure CLI 

Objetivos:
* Subir las imagenes generadas locamente a un Azure container Registry 
* Despliegue de imagenes en Azure Container Apps 
* Configuracion de Dapr en Azure Container Apps

#Container en Azure

1.- En el portal de Azure crear un Azure container Registry , el cual nombramos con nuestras iniciales mas el posfijo "acr", y usamos el SKU Standard
2.- Una vez creado vamos a habilitar la opcion de Admin user en la seccion de "Settings" -> Access keys
![image](https://user-images.githubusercontent.com/31298167/213153237-4dfa1c09-41db-4036-927e-9c7782ea6eb8.png)

3.- Abrimos una terminal y ejecutamos los siguientes comandos:
```
az login
az account set --subscription "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
az acr login --name {nombre de tu ACR}
```
4.- Generamos el alias de la imagen que deseamos subir con el siguiente comando: 
```
docker tag expensecategoryapi {nombre de tu ACR}.azurecr.io/expensecategoryapi
docker tag expensenotificationapi {nombre de tu ACR}.azurecr.io/expensenotificationapi
docker tag expenseapi {nombre de tu ACR}.azurecr.io/expenseapi
```
5.- Enviamos imagenes al container registry 
```
docker push {nombre de tu ACR}.azurecr.io/expensecategoryapi
docker push {nombre de tu ACR}.azurecr.io/expensenotificationapi
docker push {nombre de tu ACR}.azurecr.io/expenseapi
```
6.- Ya se encuentran nuestras imagenes en el container registry

![image](https://user-images.githubusercontent.com/31298167/213156954-5a505aea-36bd-48cc-9d12-e0c6ce3cbd70.png)

7.- Procedemos a crear nuestro Environment de Container apps en el portal de Azure, para esto vamos a crear la primera container app nombrandola con tus iniciales mas el posfijo "-ca-" mas expenseapi; adicionalmente creamos el container Apps Environment (lo nombraremos con nuestras iniciales mas el posfijo de "cae")
![image](https://user-images.githubusercontent.com/31298167/213157683-39e0eea4-4416-4b11-8422-923f77bbb77f.png)

8.- En la sección de app settings deseleccionamos "Use quickstart image", usamos nuestro container registry, escogemos la imagen de expenseapi, seleccionamos en CPU y Memoria "1 CPU Cores, 2 Gi memory" y habilitamos Ingress traffic desde cualquier lugar con puerto 443
![image](https://user-images.githubusercontent.com/31298167/213158392-d2ba4409-fdbc-4c4a-84e6-72789722439c.png)

9.- una vez creado nuestro primer container app y el environment, vamos a crear un container app por cada servicio: expensecategoryapi y expensenotificationapi

![image](https://user-images.githubusercontent.com/31298167/213161062-89929383-7ab2-4745-bc7e-a315ae1a52b4.png)


10.- Ahora procedemos a configurar dapr para todos los container apps, dentro del environment vamos la sección de dapr components, posteriomente le damos clic en agregar y nos basamos en nuestro archivo pubsub.yaml que trabajamos en el Laboratorio 1 
![image](https://user-images.githubusercontent.com/31298167/213163165-cdc8aa79-1224-45b1-a710-3a598011a9ed.png)

11.- Vamos a cada container app y en la seccion de Dapr lo habilitamos para cada api
![image](https://user-images.githubusercontent.com/31298167/213163782-c722520d-9f64-40b1-9d25-77d7f116d9dc.png)
