import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function DetailsPage() {
  const { id } = useParams();
  return (
    <aside>Details Page for {id}</aside>
  );
}