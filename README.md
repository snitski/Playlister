# Playlister

![Splash Screen](https://cdn.discordapp.com/attachments/754438628758913098/1082176093982838824/Screenshot_2023-02-07_at_14-12-45_Playlister.png)

Playlister is a web-based app that allows users to seamlessly create, store, and share playlists of YouTube content. It's built using the MERN stack and uses JWT to securely transmit users' credentials between the client, server, and database. The interactions between each of these components is handled using Axios.

## User Accounts

![Registration Page](https://cdn.discordapp.com/attachments/754438628758913098/1082176093693423736/Screenshot_2023-02-07_at_14-13-14_Playlister.png)

Guests are free to navigate the website and view currently published playlists and their comment sections. However, to create, duplicate, rate, or comment on playlists users first must create an account and log in. 

## Editing Playlists

![Home Screen](https://cdn.discordapp.com/attachments/754438628758913098/1082176093169143898/Screenshot_2023-02-07_at_14-15-17_Playlister.png)

When expanding a playlist for editing, the user is able to add songs, move songs, edit songs, or remove songs. Additionally, there is the option for the user to undo/redo any of their actions until they collapse the playlist's contents, then the transaction stack is cleared.

## Published Playlists

![Seach Results](https://cdn.discordapp.com/attachments/754438628758913098/1082186509467267092/Screenshot_2023-03-06_at_01-22-30_Playlister.png)

Only published playlists are visible to the public. Once published, playlists cannot be directly edited, but they can be removed by the creator or duplicated by any registered user.

### Searching for Playlists/Users

To find playlists, users are able to search for the name of the playlist or its creator using the search bar found at the top of the page. 

### Sorting Search Results

When searching for other users' playlists or looking at personal playlists, users are able to sort the displayed playlists by a few different filters (shown in screenshots).
