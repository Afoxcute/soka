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


