package site.hoyeonjigi.clonetving.common;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import site.hoyeonjigi.clonetving.exception.DuplicateProfileNameException;
import site.hoyeonjigi.clonetving.exception.LackofAuthorityException;
import site.hoyeonjigi.clonetving.exception.UserNotFoundException;

@RestControllerAdvice
public class ApiExceptionAdvice {
    
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<String> errorHandler (UsernameNotFoundException e) {
    	return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(e.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> errorHandler (RuntimeException e) {
    	return ResponseEntity.status(HttpStatus.CONFLICT)
        .body(e.getMessage());
    }

    @ExceptionHandler(TokenNotValidateException.class)
    public ResponseEntity<String> errorHandler (TokenNotValidateException e) {
    	return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(e.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> errorHandler (IllegalArgumentException e) {
    	return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(e.getMessage());
    }

    @ExceptionHandler(DuplicateProfileNameException.class)
    public ResponseEntity<String> errorHandler (DuplicateProfileNameException e){
        return ResponseEntity.status(HttpStatus.CONFLICT)
        .body(e.getMessage());
    }

    @ExceptionHandler(LackofAuthorityException.class)
    public ResponseEntity<String> errorHandler (LackofAuthorityException e){
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
        .body(e.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> errorHandler (UserNotFoundException e){
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(e.getMessage());
    }
}
