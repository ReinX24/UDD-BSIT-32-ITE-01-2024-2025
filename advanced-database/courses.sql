-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 04, 2025 at 08:26 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `solis_rein`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` int(11) NOT NULL,
  `course_code` varchar(10) NOT NULL,
  `course_name` varchar(100) NOT NULL,
  `department` varchar(50) DEFAULT NULL,
  `credits` int(11) DEFAULT NULL,
  `semester` enum('1st','2nd','Summer') DEFAULT NULL,
  `level` enum('Undergraduate','Graduate') DEFAULT NULL,
  `instructor` varchar(100) DEFAULT NULL,
  `schedule` varchar(50) DEFAULT NULL,
  `mode` enum('Online','In-Person','Hybrid') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_id`, `course_code`, `course_name`, `department`, `credits`, `semester`, `level`, `instructor`, `schedule`, `mode`) VALUES
(1, 'CS101', 'Introduction to Programming', 'Computer Science', 3, '1st', 'Undergraduate', 'Dr. Reyes', 'MWF 9-10 AM', 'In-Person'),
(2, 'CS102', 'Data Structures', 'Computer Science', 3, '2nd', 'Undergraduate', 'Prof. Dela Cruz', 'TTh 1-2:30 PM', 'Hybrid'),
(3, 'CS201', 'Database Systems', 'Computer Science', 4, '1st', 'Undergraduate', 'Dr. Santos', 'MWF 10-11 AM', 'In-Person'),
(4, 'CS301', 'Web Development', 'Computer Science', 3, '2nd', 'Undergraduate', 'Ms. Garcia', 'TTh 3-4:30 PM', 'Online'),
(5, 'IT101', 'Computer Networks', 'Information Technology', 3, '1st', 'Undergraduate', 'Engr. Fernandez', 'MWF 2-3 PM', 'Hybrid'),
(6, 'IT202', 'Cybersecurity Fundamentals', 'Information Technology', 3, '2nd', 'Undergraduate', 'Prof. Lopez', 'TTh 9-10:30 AM', 'In-Person'),
(7, 'CS401', 'Artificial Intelligence', 'Computer Science', 4, '1st', 'Graduate', 'Dr. Villanueva', 'Sat 8-11 AM', 'Online'),
(8, 'IT303', 'Cloud Computing', 'Information Technology', 3, '2nd', 'Graduate', 'Dr. Ramos', 'Sat 1-4 PM', 'Hybrid'),
(9, 'CS501', 'Machine Learning', 'Computer Science', 4, '1st', 'Graduate', 'Dr. Mendoza', 'Sun 10 AM-1 PM', 'Online'),
(10, 'IT404', 'Blockchain Technology', 'Information Technology', 3, '2nd', 'Graduate', 'Prof. Torres', 'Fri 5-8 PM', 'In-Person');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
