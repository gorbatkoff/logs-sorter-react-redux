import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Link } from 'react-router-dom';


import Dropzone from "react-dropzone";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';

import axios from 'axios';
import Archive from "./pages/Archive";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Result from "./components/Result/Result";
import Search from "./components/Search/Search";

export default function App() {

  return (
    <div className="App">

      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/check-id:id" element={<Result />} />
        <Route path="/search" element={<Search />} />
      </Routes>

    </div>

  );
}
