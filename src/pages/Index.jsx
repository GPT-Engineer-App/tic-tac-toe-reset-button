import React, { useState } from "react";
import { Button, Grid, GridItem, Text, useToast, VStack, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const winner = calculateWinner(board);
  const toast = useToast();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Reset game handler
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  // Click cell handler
  const handleClick = (index) => {
    if (winner || board[index]) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  // Render cell
  const renderCell = (index) => {
    return (
      <GridItem w="100%" h="100%">
        <Button h="100px" w="100px" onClick={() => handleClick(index)} fontSize="3xl" variant="outline">
          {board[index]}
        </Button>
      </GridItem>
    );
  };

  // Calculate winner
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // Display winner message
  React.useEffect(() => {
    if (winner) {
      toast({
        title: "Game Over",
        description: `Player ${winner} has won!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [winner, toast]);

  return (
    <VStack spacing={4}>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={toggleModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Text fontSize="2xl">{winner ? `Winner: ${winner}` : `Next player: ${isXNext ? "X" : "O"}`}</Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        {Array(9)
          .fill(null)
          .map((_, i) => renderCell(i))}
      </Grid>
      <Button leftIcon={<Icon as={FaTrash} />} colorScheme="red" variant="outline" onClick={resetGame} position="fixed" bottom={4} right={4}>
        Reset
      </Button>
    </VStack>
  );
};

export default Index;
