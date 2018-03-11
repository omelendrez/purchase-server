-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: us-cdbr-iron-east-05.cleardb.net    Database: heroku_23dc8f4ee33fd5a
-- ------------------------------------------------------
-- Server version	5.6.36-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status_id` int(11) DEFAULT '1',
  `organization_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'MANAGEMENT',1,1,'2018-03-06 00:00:00','2018-03-07 12:29:43'),(11,'ACCOUNTING',1,11,'2018-03-06 22:49:19','2018-03-06 22:49:19'),(21,'HUMAN RESOURCES',1,11,'2018-03-06 22:49:31','2018-03-06 22:49:31'),(31,'PROCUREMENT',1,11,'2018-03-06 22:49:39','2018-03-06 22:49:39'),(41,'INFORMATION TECHNOLOGY',1,11,'2018-03-06 23:27:02','2018-03-06 23:27:02');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `status_id` int(11) DEFAULT '1',
  `organization_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'ARGENTINA BRANCH','Tres Arroyos, 531, Piso 10, Depto B, Bahia Blanca, Argentina','+542915754922',1,1,'2018-03-06 00:00:00','2018-03-07 12:29:50'),(11,'NIGERIA BRANCH','Onne Free Zone Port','+234',1,1,'2018-03-06 00:00:00','2018-03-07 12:29:55'),(21,'HEAD OFFICE','Street 24 Number 789, Manila','+546664646',1,11,'2018-03-06 22:50:15','2018-03-06 22:50:15');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organizations`
--

DROP TABLE IF EXISTS `organizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organizations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status_id` int(11) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `organizations_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES (1,'ESCNG',1,'2018-03-06 00:00:00','2018-03-06 00:00:00'),(11,'ACME CORPORATION',1,'2018-03-06 22:42:18','2018-03-06 22:42:18');
/*!40000 ALTER TABLE `organizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status_id` int(11) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'POA','PURCHASE ORDER APPROVER','The person with this permission is the one who can approve the issuance to vendors of a Purchase Order usually received from a Purchasing Officer',1,'2018-03-07 22:36:33','2018-03-07 22:36:33'),(11,'POI','PURCHASE ORDER ISSUER','Usually staff from Purchase or Procurement Department fall under this type of users, which are the ones who receive approved Purchase Request in order to issue Purchase Orders to vendors',1,'2018-03-07 22:36:54','2018-03-07 22:36:54'),(21,'PRA','PURCHASE REQUEST APPROVER','The users with this permission will be responsible for the approval of the Purchase They will be able to see all the requests made by his subordinates for him to approve or reject before the request reaches Purchase/Procurement Department',1,'2018-03-07 22:37:16','2018-03-07 22:37:16'),(31,'PRI','PURCHASE REQUEST ISSUER','Any user with this permission will be able to launch Purchase Requests. These users will be able to see only the requests they have issued (approved or rejected)',1,'2018-03-07 22:37:40','2018-03-07 22:37:40'),(41,'RRI','RECEIVING REPORT ISSUER','The activities of the users with this permission is to receive the items from the vendor and to register the confirmation of its receptions. These users will close the flow that started with the Purchase Request, then the Purchase Order',1,'2018-03-07 22:37:59','2018-03-07 22:37:59');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status_id` int(11) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,'ADMIN',1,'2018-03-06 00:00:00','2018-03-06 00:00:00'),(11,'USER',1,'2018-03-06 00:00:00','2018-03-06 00:00:00');
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status_id` int(11) DEFAULT '1',
  `organization_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'03001','COMMON SERVICES',1,11,'2018-03-07 15:42:28','2018-03-07 23:39:02'),(11,'04008','BUILDING CONSTRUCTION',1,11,'2018-03-07 23:39:20','2018-03-07 23:39:36');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `status_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Active','2018-03-04 13:09:41','2018-03-04 13:09:41'),(11,'Inactive','2018-03-04 13:09:51','2018-03-04 13:09:51');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT '123',
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `status_id` int(11) DEFAULT '1',
  `organization_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `department_id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'omar.melendrez','$2a$10$UhX/ODNaa/VPM7fd1qzmeOKhv3pVChVUaJI7dC454qfcRqCKif2BK','Omar Melendrez','omar.melendrez@gmail.com',1,1,1,1,1,'2018-03-04 13:07:18','2018-03-04 13:07:18'),(21,'marnel.alabro','$2a$10$9hMaCF9lGIjv6mPDLyOV/.tc52dkiMAb3loEUMr82q7521ghGr1ky','Marnel Alabro','tomakats@gmail.com',1,1,11,1,1,'2018-03-05 14:44:24','2018-03-07 09:01:10'),(31,'mike','$2a$10$oPFwoklzeNsW.AKRerQdruA5KBpP5lMgg714iJSurpFUZb6X8ruSy','Mike','mike@acme.com',1,11,21,41,1,'2018-03-06 22:48:45','2018-03-06 23:53:42'),(41,'paul','$2a$10$XGKBVHN/zxVivhMlIwo/euOgndfZICkRTCb6S5C/087lKG6B/vhsq','Paul','paul@acme.com',1,11,21,11,11,'2018-03-06 23:18:20','2018-03-06 23:18:20'),(51,'richard','$2a$10$/bKjh0jBcCzFdsue6Fe4tOcjAwlRR1eP0vM4GhrKDmeW8VSFewvwS','Richard','richard@acme.com',1,11,21,11,11,'2018-03-06 23:19:18','2018-03-06 23:19:18'),(61,'ana','$2a$10$80fXVF5NwwVrC9tPa7Q0Ze2HRPG.U.fPeXADrisrmefbmJAhd67vK','Ana','ana@acme.com',1,11,21,21,11,'2018-03-06 23:21:47','2018-03-06 23:21:47'),(71,'john','$2a$10$vW82GfV7o2ELvul6CfgD2u03NAzN3J/0chIhlrix2w5a4hgJCzZ3e','John','john@acme.com',1,11,21,21,11,'2018-03-06 23:22:18','2018-03-06 23:22:18'),(81,'michael','$2a$10$BN516qlSXsG48pCimy0FVO6X8rZlFGW6lKx79shjfUs./FtTupeEy','Michael','michael@acme.com',1,11,21,31,11,'2018-03-06 23:23:39','2018-03-06 23:23:39'),(91,'matt','$2a$10$bfMBYj.WMsRjLS6m1gQAK.zD69C.9qoMk2n9IFeDz.SEYnhhDrg66','Matt','matt@acme.com',1,11,21,31,11,'2018-03-06 23:24:07','2018-03-06 23:24:07'),(101,'joseph','$2a$10$B/Mm.GptIktgLG0m2vTYmOODGvqN9GLfL7trWAuWPnW3z0jy3d2Oe','Joseph','joseph@acme.com',1,11,21,31,11,'2018-03-06 23:24:35','2018-03-06 23:24:35');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendors`
--

DROP TABLE IF EXISTS `vendors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `status_id` int(11) DEFAULT '1',
  `organization_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendors`
--

LOCK TABLES `vendors` WRITE;
/*!40000 ALTER TABLE `vendors` DISABLE KEYS */;
INSERT INTO `vendors` VALUES (1,'V-001','FERRUM MACHINES INC.','23, Main Road, Barrington, New Jersey, U.S.A.','+1 (535) 5656-0258','sales@ferrummac.com','Mrs. Angie Farrell',1,11,'2018-03-07 23:36:44','2018-03-07 23:37:09');
/*!40000 ALTER TABLE `vendors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-08  9:53:38
