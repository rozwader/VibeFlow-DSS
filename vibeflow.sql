-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2025 at 03:03 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vibeflow`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `artist` text DEFAULT NULL,
  `fileName` text NOT NULL,
  `platform` tinyint(1) NOT NULL,
  `createdAt` date NOT NULL,
  `creator` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `name`, `artist`, `fileName`, `platform`, `createdAt`, `creator`) VALUES
(2, 'asd', 'asd', 'testoweAudio.mp3', 0, '0000-00-00', 'Maciej Rozwadowski'),
(3, 'Dreaming', '', 'dreaming-by-tubebackr.mp3', 0, '0000-00-00', 'asd'),
(4, 'Return', 'Damtaro', 'return-by-damtaro.mp3', 0, '0000-00-00', 'asd'),
(5, 'Like a dream', 'GalaxyTones', 'like-a-dream-by-galaxytones.mp3', 0, '0000-00-00', 'Maciej Rozwadowski');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `playlists`
--

CREATE TABLE `playlists` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `creator` text NOT NULL,
  `createdAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`id`, `name`, `creator`, `createdAt`) VALUES
(1, 'Pierwsza', 'Maciej Rozwadowski', '0000-00-00'),
(2, 'Druga', 'Maciej Rozwadowski', '0000-00-00'),
(3, 'Trzecia', 'Maciej Rozwadowski', '0000-00-00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `playlistscontent`
--

CREATE TABLE `playlistscontent` (
  `id` int(11) NOT NULL,
  `fileId` int(11) NOT NULL,
  `playlistId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `playlistscontent`
--

INSERT INTO `playlistscontent` (`id`, `fileId`, `playlistId`) VALUES
(1, 3, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `provider` varchar(50) DEFAULT 'credentials'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `createdAt`, `provider`) VALUES
(1, 'asd', '$2b$10$zbyaG9COdF3XusIgNptrVuV1megqT6DBqAzvmrsbxpz4DpBQ3gmdi', 'a@a.a', '2025-04-01 14:07:43', 'credentials'),
(2, 'asdd', '$2b$10$eImQDzvqDxvtczh7jmfrNuTqb/zjzZj5c2ORw0T1eztgY0vByw2s2', 'a@a.a', '2025-04-01 14:12:39', 'credentials'),
(6, 'Maciej Rozwadowski', NULL, 'maciek.rozwadowski2006@gmail.com', '2025-04-21 08:56:55', 'google');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `playlistscontent`
--
ALTER TABLE `playlistscontent`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `playlistscontent`
--
ALTER TABLE `playlistscontent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
