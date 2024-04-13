import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import swal from 'sweetalert';

const InterviewList = ({ email }) => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const interviewsPerPage = 3; // Number of interviews to display per page

  // Function to fetch interview data for the current page
  const fetchInterviews = async () => {
    try {
      const response = await fetch(`http://localhost:3001/getinterview`);
      if (!response.ok) {
        throw new Error('Failed to fetch interviews');
      }
      const data = await response.json();
      setInterviews(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching interviews:', error);
      setError('Failed to fetch interviews');
      setLoading(false);
    }
  };

  // Function to handle pagination
  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleAcceptInterview = async (interviewId) => {
    try {
      const response = await fetch(`http://localhost:3001/acceptInterview/${interviewId}`, {
        method: 'PUT',
      });
      if (response.ok) {
        // Update the interview status locally
        swal({
          title: "Interview Accepted",
          text: "The interview has been accepted and the trainer will be notified.",
          icon: "success",
          button: "OK",
        });
        setInterviews(prevInterviews =>
          prevInterviews.map(interview =>
            interview._id === interviewId ? { ...interview, interviewStatus: 'Accepted' } : interview
          )
        );
      } else {
        throw new Error('Failed to accept interview');
      }
    } catch (error) {
      console.error('Error accepting interview:', error);
      // Handle error if necessary
    }
  };
  
  const handleRejectInterview = async (interviewId) => {
    try {
      const response = await fetch(`http://localhost:3001/rejectInterview/${interviewId}`, {
        method: 'PUT',
      });
      if (response.ok) {
        // Update the interview status locally
        setInterviews(prevInterviews =>
          prevInterviews.map(interview =>
            interview._id === interviewId ? { ...interview, interviewStatus: 'Rejected' } : interview
          )
        );
      } else {
        throw new Error('Failed to reject interview');
      }
    } catch (error) {
      console.error('Error rejecting interview:', error);
      // Handle error if necessary
    }
  };


  useEffect(() => {
    fetchInterviews();
  }, [email, currentPage]); // Fetch interviews when email or currentPage changes

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Interviews</h1>

      {/* Display loading state */}
      {loading && <div className="text-center text-gray-500">Loading...</div>}

      {/* Display error state */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Display interviews */}
      {!loading && !error && (
        <TransitionGroup className="interview-list">
          {interviews.map(interview => (
            <CSSTransition key={interview._id} timeout={500} classNames="fade">
              <div className="border shadow-md p-4 rounded-md mb-4">
                <div className="text-lg font-semibold mb-2">Interview ID: {interview._id}</div>
                <div>Company Name: {interview.companyName}</div>
                <div>Trainer Email : {interview.trainerEmail}</div>
                <div>Interview Date: {formatDate(interview.interviewDate)}</div>
                <div>Interview Time: {interview.interviewTime}</div>
                <div>Interview Status : {interview.interviewStatus}</div>
                {/* Render other interview details as needed */}
                <div className="mt-4">
                  <button
                    onClick={() => handleAcceptInterview(interview._id)}
                    disabled={interview.interviewStatus !== 'Pending'}
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRejectInterview(interview._id)}
                    disabled={interview.interviewStatus !== 'Pending'}
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}

      {/* Pagination controls */}
      {!loading && !error && (
        <div className="flex justify-between mt-4">
          <button onClick={prevPage} disabled={currentPage === 1} className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2">
            Previous
          </button>
          <button onClick={nextPage} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default InterviewList;

