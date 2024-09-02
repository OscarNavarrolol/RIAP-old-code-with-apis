-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: final_riap
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `id_attendance` bigint NOT NULL AUTO_INCREMENT,
  `attendance_time` datetime(6) DEFAULT NULL,
  `id_event` bigint NOT NULL,
  `id_user` bigint NOT NULL,
  PRIMARY KEY (`id_attendance`),
  KEY `FKdkpb10sy52l7frsetc3d3c4j3` (`id_event`),
  KEY `FKqw3o86cueipnw8puxyhf17t5n` (`id_user`),
  CONSTRAINT `FKdkpb10sy52l7frsetc3d3c4j3` FOREIGN KEY (`id_event`) REFERENCES `event_data` (`id_event`),
  CONSTRAINT `FKqw3o86cueipnw8puxyhf17t5n` FOREIGN KEY (`id_user`) REFERENCES `user_data` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (4,'2024-05-30 09:10:00.000000',2,6),(5,'2024-05-30 09:11:00.000000',2,7),(7,'2024-05-20 10:10:00.000000',3,3),(8,'2024-05-20 10:10:00.000000',3,4),(9,'2024-05-20 10:00:00.000000',3,5),(10,'2024-05-20 10:10:00.000000',3,6),(11,'2024-05-20 10:20:00.000000',3,7),(26,NULL,57,2),(27,NULL,57,7),(28,NULL,57,6),(35,NULL,60,2),(36,'2024-04-22 14:32:43.420528',60,7),(37,NULL,60,6),(50,NULL,66,2),(51,NULL,66,7),(52,NULL,66,6),(63,NULL,70,1),(64,NULL,70,3),(65,NULL,70,4),(66,NULL,70,5);
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `id_course` bigint NOT NULL AUTO_INCREMENT,
  `number_course` int NOT NULL,
  `id_program` bigint NOT NULL,
  PRIMARY KEY (`id_course`),
  KEY `FK3s0xasppoye8q46vw6kvlwp30` (`id_program`),
  CONSTRAINT `FK3s0xasppoye8q46vw6kvlwp30` FOREIGN KEY (`id_program`) REFERENCES `program` (`id_program`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,2670120,1),(2,2203291,2);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_data`
--

DROP TABLE IF EXISTS `event_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_data` (
  `id_event` bigint NOT NULL AUTO_INCREMENT,
  `date_event` date NOT NULL,
  `end_time` time NOT NULL,
  `location` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `objective` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_time` time NOT NULL,
  PRIMARY KEY (`id_event`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_data`
--

LOCK TABLES `event_data` WRITE;
/*!40000 ALTER TABLE `event_data` DISABLE KEYS */;
INSERT INTO `event_data` VALUES (2,'2024-05-30','12:00:00','Sala de Eventos','Manejo de Residuos','09:00:00'),(3,'2024-05-20','13:00:00','Auditorio Principal','Uso de Ambientes virtuales','10:00:00'),(57,'2024-04-19','19:59:00','Ambiente de SKD','campaña contra el VIH','18:59:00'),(60,'2024-04-22','22:32:00','Salon 505 monkey','Accion Innecesaria para aprobar curso','13:32:00'),(66,'2024-05-13','12:00:00','Ubicación normal','Descripción del objetivo del evento','08:00:00'),(70,'2024-09-03','00:30:00','Auditorio Pescadero','Induccion al nuevo sistema','11:30:00');
/*!40000 ALTER TABLE `event_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program`
--

DROP TABLE IF EXISTS `program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `program` (
  `id_program` bigint NOT NULL AUTO_INCREMENT,
  `name_program` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_program`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program`
--

LOCK TABLES `program` WRITE;
/*!40000 ALTER TABLE `program` DISABLE KEYS */;
INSERT INTO `program` VALUES (1,'ADSO'),(2,'Cocina'),(14,'ESTUDIOSO');
/*!40000 ALTER TABLE `program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recovery`
--

DROP TABLE IF EXISTS `recovery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recovery` (
  `id_recovery` bigint NOT NULL AUTO_INCREMENT,
  `recovery_key` varchar(100) NOT NULL,
  `expiration_date` datetime NOT NULL,
  `id_user` bigint NOT NULL,
  PRIMARY KEY (`id_recovery`),
  UNIQUE KEY `key_UNIQUE` (`recovery_key`),
  KEY `id_user_idx` (`id_user`),
  CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `user_data` (`id_user`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=1007 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recovery`
--

LOCK TABLES `recovery` WRITE;
/*!40000 ALTER TABLE `recovery` DISABLE KEYS */;
INSERT INTO `recovery` VALUES (1005,'ala1ala2ala3ala4','2024-05-10 21:11:20',1),(1006,'daswqe2312a','2024-05-11 21:11:20',1);
/*!40000 ALTER TABLE `recovery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_course`
--

DROP TABLE IF EXISTS `user_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_course` (
  `id_user_course` bigint NOT NULL AUTO_INCREMENT,
  `id_course` bigint DEFAULT NULL,
  `id_user` bigint DEFAULT NULL,
  PRIMARY KEY (`id_user_course`),
  KEY `FKsdlq9odlq12vlja73ckncijrn` (`id_course`),
  KEY `FKpv62jpkhyfn34jb7myrob0ku4` (`id_user`),
  CONSTRAINT `FKpv62jpkhyfn34jb7myrob0ku4` FOREIGN KEY (`id_user`) REFERENCES `user_data` (`id_user`),
  CONSTRAINT `FKsdlq9odlq12vlja73ckncijrn` FOREIGN KEY (`id_course`) REFERENCES `course` (`id_course`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_course`
--

LOCK TABLES `user_course` WRITE;
/*!40000 ALTER TABLE `user_course` DISABLE KEYS */;
INSERT INTO `user_course` VALUES (1,1,1),(2,1,3),(3,1,4),(4,1,5),(5,2,2),(6,2,7),(7,2,6);
/*!40000 ALTER TABLE `user_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_data`
--

DROP TABLE IF EXISTS `user_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_data` (
  `id_user` bigint NOT NULL AUTO_INCREMENT,
  `age` int NOT NULL,
  `document_number` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_user` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_picture` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_user` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_data`
--

LOCK TABLES `user_data` WRITE;
/*!40000 ALTER TABLE `user_data` DISABLE KEYS */;
INSERT INTO `user_data` VALUES (1,50,'1234453','marco22@gmail.com','Marco Garcia Monero','marcosena123','3132433215','https://vkboueidcnqwbjyejiud.supabase.co/storage/v1/object/public/stock-of-images/person5.jpg','admin'),(2,29,'1832122','juan31@gmail.com','Juan Carlos Trigal','insalubridad','3122349012','https://vkboueidcnqwbjyejiud.supabase.co/storage/v1/object/public/stock-of-images/person7.jpg','admin'),(3,19,'1532134','ArianaLo@gmail.com','Ariana Lorens Kurian','arianlko','3153210392',NULL,'apprentice'),(4,23,'1123457','alandeq@gmail.com','Alandro Jorgue Ruiz','alanbRuiz','3133321459',NULL,'apprentice'),(5,21,'1093221','darkes@gmail.com','Darion Kertos Ruiz','darion321','3130392187',NULL,'apprentice'),(6,19,'1193821','oscardnv123455@gmail.com','Karmen Villa Medina','karmen3L','3182389013',NULL,'apprentice'),(7,18,'1099323','loanade@gmail.com','Loisa Lindar Kerio','loisaL21','3132900932',NULL,'apprentice');
/*!40000 ALTER TABLE `user_data` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-02 15:43:55
