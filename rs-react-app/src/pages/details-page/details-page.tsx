import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './details-page.css';

type FoodDetails = {
  uid: string;
  name: string;
  earthlyOrigin?: string;
};

type FoodDetailsResponse = {
  food: FoodDetails;
};

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [details, setDetails] = useState<FoodDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();

    const fetchDetails = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(
          `https://stapi.co/api/v1/rest/food?uid=${id}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch details');
        }

        const data = (await response.json()) as FoodDetailsResponse;
        if (controller.signal.aborted) return;

        setDetails(data.food);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError')
          return;
        setError('Failed to fetch details');
        setDetails(null);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchDetails();

    return () => {
      controller.abort();
    };
  }, [id]);

  const handleBackButtonClick = () => {
    navigate(`/${location.search}`);
  };

  return (
    <aside>
      {isLoading && <div>Loading...</div>}

      {error && <div>{error}</div>}

      {details && (
        <div>
          <h2>{details.name}</h2>
          <p>Earthly Origin: {details.earthlyOrigin || 'Unknown'}</p>
        </div>
      )}
      <button
        className="close-caption-button"
        type="button"
        onClick={handleBackButtonClick}
      >
        Close
      </button>
    </aside>
  );
}
