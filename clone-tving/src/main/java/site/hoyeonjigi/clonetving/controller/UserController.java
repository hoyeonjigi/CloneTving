package site.hoyeonjigi.clonetving.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import site.hoyeonjigi.clonetving.dto.JsonWebTokenDto;
import site.hoyeonjigi.clonetving.dto.UserDto;
import site.hoyeonjigi.clonetving.dto.UserEditPasswordRequestDto;
import site.hoyeonjigi.clonetving.dto.UserEditRequestDto;
import site.hoyeonjigi.clonetving.dto.UserLoginRequsetDto;
import site.hoyeonjigi.clonetving.dto.UserRegisterRequestDto;
import site.hoyeonjigi.clonetving.service.UserService;
 
@RestController
@RequestMapping(value="/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<UserDto> userInfo(Authentication authentication) throws Exception{
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String userId = userDetails.getUsername();
        UserDto userDto = userService.inquireUserInfo(userId);
    
        return ResponseEntity.ok(userDto);
	}

    //@RequestMapping(value="/list", method=RequestMethod.GET) 
	public ResponseEntity<?> userList() throws Exception{
    
        String[] userList = userService.findUserList();

        return ResponseEntity.ok(userList);
	}

    @RequestMapping(value="/exist/{userId}", method=RequestMethod.GET) 
	public ResponseEntity<?> userFind(@PathVariable("userId") String userId) throws Exception{
    
        return ResponseEntity.ok(userService.findUser(userId));
	}

    @RequestMapping(value="/login", method=RequestMethod.POST)
	public ResponseEntity<JsonWebTokenDto> userLogin(@RequestBody UserLoginRequsetDto userLoginRequsetDto) throws Exception{
        String userId = userLoginRequsetDto.getUserId();
        String password = userLoginRequsetDto.getUserPassword();
        JsonWebTokenDto jsonWebTokenDto = userService.login(userId, password);
    
        return ResponseEntity.ok(jsonWebTokenDto);
	}

    //엑세스토큰의 유효기간이 지났다면, 리프레시 토큰을 받는다.
    @RequestMapping(value="/refresh", method=RequestMethod.POST)
	public ResponseEntity<JsonWebTokenDto> userRefresh(HttpServletRequest request) throws Exception{
        
        JsonWebTokenDto jsonWebTokenDto = userService.tokenRefresh(request);
    
        return ResponseEntity.ok(jsonWebTokenDto);
	}

    @RequestMapping(value="/register", method=RequestMethod.POST)
	public ResponseEntity<?> userRegister(@RequestBody UserRegisterRequestDto userRegisterRequestDto) throws Exception{

        userService.register(userRegisterRequestDto);
        
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

    @RequestMapping(value="/edit", method=RequestMethod.PUT)
	public ResponseEntity<UserDto> userEditInfo(Authentication authentication, @RequestBody UserEditRequestDto userEditRequestDto) throws Exception{
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String userId = userDetails.getUsername();
        UserDto userDto = userService.editInfo(userId, userEditRequestDto);
        
		return ResponseEntity.ok(userDto);
	}

    @RequestMapping(value="/edit/password", method=RequestMethod.PATCH)
	public ResponseEntity<?> userEditPassword(Authentication authentication, @RequestBody UserEditPasswordRequestDto userEditPasswordRequestDto) throws Exception{
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String userId = userDetails.getUsername();
        userService.editPassword(userId, userEditPasswordRequestDto);
        
		return ResponseEntity.ok().build();
	}

    @RequestMapping(method=RequestMethod.DELETE)
	public ResponseEntity<?> userDelete(Authentication authentication) throws Exception{
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String userId = userDetails.getUsername();
        userService.delete(userId);
        
		return ResponseEntity.ok().build();
	}

}
