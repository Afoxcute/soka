//Split the error string by double newlines and take the first part and return the first line from each message
// export function extractErrorMessages(errorString: string): string {

//   const messages = errorString.split('\n\n');
//   const firstLines = messages
//     .map((message) => {
//       const lines = message.split('\n');

//       if (lines.length > 0) {

//         if (lines[0].includes('The total cost')) {
//           return lines[0];
//         } else if (lines[0].includes('User rejected')) {
//           return lines[0];
//         }
//       }
//       return '';
//     })
//     .filter((line) => line);


//   return firstLines.join('\n');
// }


// export function extractErrorMessages(error: string): string {
//   // Check if the error contains 'ContractFunctionExecutionError'
//   if (error.includes('ContractFunctionExecutionError')) {
//     // Check for insufficient funds error
//     if (error.includes('insufficient funds')) {
//       return 'Insufficient funds';
//     }
//     // Check for contract function reversion with a reason
//     const revertReasonMatch = error.match(
//       /reverted with the following reason:\s*(.*)/
//     );
//     if (revertReasonMatch) {
//       return revertReasonMatch[1].trim(); // Return the specific revert reason like "Already in game"
//     }
//   }

//   // Check if the error contains 'TransactionExecutionError'
//   if (error.includes('TransactionExecutionError')) {
//     // Check for user rejected error
//     if (error.includes('User rejected the request')) {
//       return 'User rejected the request.';
//     }
//   }

//   // Fallback for unhandled errors
//   return 'An unknown error occurred.';
// }


type ErrorObject = {
  message: string;
};

/**
 * Formats blockchain error messages to be more readable
 * @param error - The error object or string to format
 * @returns A cleaned up, human-readable error message
 */
export function extractErrorMessages(error: Error | ErrorObject | string): string {
  // Convert error to string if it's an object
  const errorMessage =
    typeof error === 'string' ? error : error.message || String(error);

  // Extract the main error message if it's a ContractFunctionExecutionError
  if (errorMessage.includes('ContractFunctionExecutionError')) {
    // Check if it's a revert reason
    if (errorMessage.includes('reverted with the following reason:')) {
      const match = errorMessage.match(
        /reverted with the following reason:\s*([^\n]+)/
      );
      return match ? match[1].trim() : errorMessage;
    }

    // For other contract execution errors, get the first meaningful message
    const match = errorMessage.match(
      /ContractFunctionExecutionError: ([^\n]+)/
    );
    return match ? match[1].trim() : errorMessage;
  }

  // Handle transaction rejection
  if (
    errorMessage.includes('TransactionExecutionError') &&
    errorMessage.includes('User rejected the request')
  ) {
    return 'User rejected the request.';
  }

  // Handle insufficient funds
  if (errorMessage.includes('insufficient funds for gas * price + value')) {
    return 'Insufficient funds';
  }

  // Return the original message if no specific formatting is needed
  return 'unknown error';
}


