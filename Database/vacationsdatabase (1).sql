-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 20, 2023 at 05:29 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationsdatabase`
--
CREATE DATABASE IF NOT EXISTS `vacationsdatabase` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacationsdatabase`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(2, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(256) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(1, 'Joe', 'Cole', 'joecole@gmail.com', '', 'Admin'),
(2, 'Bart', 'Greg', 'bartgreg@gmail.com', '123456', 'User'),
(4, 'Loren', 'Kore', 'lorenkore@gmail.com', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', 'Admin'),
(5, 'Homer', 'Simpson', 'HomerSinpson@gmail.com', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 'User'),
(6, 'shai', 'raviv', 'shairaviv@gmail.com', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 'User'),
(7, 'shao', 'shao', 'shao2@gmail.com', '66d16a112e7bca5c5f21a58e7f75b52705bee99927f4af4513bc53a1529fdb1eb6cc9cd19dbfcd3c6024ab74cc4eb2dcb1cf21c2f64a263e8cf7c6ce9c5341cb', 'User'),
(8, 'shao', 'dlao', 'shai123@gmail.com', '274e2bff61a9b36a7fe11aa1c5dcf7107dc27416d2a7cd1d519f0e749193528699ea5e8f4e7b6cab358119cb119e6cfb91ab0ccd9647c19d3a74246eb3fbf43d', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `imageName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(1, 'Madrid', 'Madrid is the capital of Spain, and is home to the Spanish Royal family as well as the Spanish Government. It is a modern metropolitan city and an economical and industrial center of Spain, and, with its population of nearly 3,5 million people, is also the biggest city in Spain..', '2023-01-28', '2023-02-16', '7618', ''),
(2, 'Athenes', 'Greece, the southernmost of the countries of the Balkan Peninsula. Geography has greatly influenced the country’s development. Mountains historically restricted internal communications, but the sea opened up wider horizons.', '2023-02-02', '2023-02-07', '2347', ''),
(3, 'Tokyo', 'Tokyo, formerly (until 1868) Edo, city and capital of Tokyo to (metropolis) and of Japan. It is located at the head of Tokyo Bay on the Pacific coast of central Honshu. It is the focus of the vast metropolitan area often called Greater Tokyo, the largest urban and industrial agglomeration in Japan.', '2023-02-13', '2023-02-28', '19623', ''),
(4, 'Thailand', 'Thailand, country located in the centre of mainland Southeast Asia. Located wholly within the tropics, Thailand encompasses diverse ecosystems, including the hilly forested areas of the northern frontier, the fertile rice fields of the central plains, the broad plateau of the northeast, and the rugged coasts along the narrow southern peninsula.', '2023-01-15', '2023-02-16', '11583', ''),
(5, 'Hawai', 'There are eight main Hawaiian islands. Seven are inhabited, but only six are open to tourists and locals. Niʻihau is privately managed by brothers Bruce and Keith Robinson; access is restricted to those who have their permission.', '2023-03-14', '2023-04-05', '16381', ''),
(6, 'Budapest', 'Budapest, city, capital of Hungary, and seat of Pest megye (county). The city is the political, administrative, industrial, and commercial centre of Hungary. The site has been continuously settled since prehistoric times and is now the home of about one-fifth of the country’s population.', '2023-02-04', '2023-02-09', '2365', ''),
(7, 'Amsterdam', 'Amsterdam, city and port, western Netherlands, located on the IJsselmeer and connected to the North Sea. It is the capital and the principal commercial and financial centre of the Netherlands.', '2023-03-16', '2023-03-22', '4827', ''),
(8, 'Sweden', 'Sweden, country located on the Scandinavian Peninsula in northern Europe. The name Sweden was derived from the Svear, or Suiones, a people mentioned as early as 98 CE by the Roman author Tacitus. The country’s ancient name was Svithiod. Stockholm has been the permanent capital since 1523.', '2023-03-05', '2023-03-13', '4342', ''),
(9, 'London', 'London, city, capital of the United Kingdom. It is among the oldest of the world’s great cities—its history spanning nearly two millennia—and one of the most cosmopolitan. By far Britain’s largest metropolis, it is also the country’s economic, transportation, and cultural centre.', '2023-04-16', '2023-04-21', '3269', ''),
(10, 'Caribbean', 'Boasting a beach for each day of the year, low-lying Antigua in the Leeward Islands delivers a multitude of postcard-perfect beaches, with coral reefs just a flipper-kick from shore. Depending on where you are, the hue shifts from brilliant white through rose gold to cotton-candy pink. ', '2023-03-02', '2023-03-30', '34855', ''),
(11, 'Tanzania', 'A safari in Tanzania is an exciting and unique vacation experience that allows you to see some of the most breathtaking wildlife and natural landscapes in the world. Tanzania is home to some of the most famous national parks and conservation areas in Africa, including the Serengeti, Ngorongoro Crater, and Tarangire National Park.', '2023-04-03', '2023-04-21', '10682', ''),
(12, 'Buenos Aires', 'Buenos Aires, the capital of Argentina, is a vibrant and exciting destination for a vacation. Known as the \"Paris of South America,\" Buenos Aires is famous for its rich culture, delicious food, and passionate tango dance.', '2023-05-24', '2023-06-17', '18364', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
