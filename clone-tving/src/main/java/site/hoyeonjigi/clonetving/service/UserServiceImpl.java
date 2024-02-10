package site.hoyeonjigi.clonetving.service;

import java.util.Optional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import site.hoyeonjigi.clonetving.common.JwtProvider;
import site.hoyeonjigi.clonetving.common.TokenNotValidateException;
import site.hoyeonjigi.clonetving.domain.UserEntity;
import site.hoyeonjigi.clonetving.dto.JsonWebTokenDto;
import site.hoyeonjigi.clonetving.dto.UserDto;
import site.hoyeonjigi.clonetving.dto.UserEditPasswordRequestDto;
import site.hoyeonjigi.clonetving.dto.UserEditRequestDto;
import site.hoyeonjigi.clonetving.dto.UserRegisterRequestDto;
import site.hoyeonjigi.clonetving.repository.UserRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final BCryptPasswordEncoder encode;
    private final UserRepository userRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtProvider jwtProvider;

    @Override
    public UserDto inquireUserInfo(String userId) throws IllegalArgumentException {
        UserDto userDto = null;
        Optional<UserEntity> userEntity = userRepository.findById(userId);
        if(userEntity.isPresent()) {
            userDto = new UserDto(userEntity.get());
        } else{
            throw new IllegalArgumentException("해당 회원이 존재하지 않습니다.");
        }

        return userDto;
    }

    @Override
    public JsonWebTokenDto login(String userId, String userPassword) throws UsernameNotFoundException {
        //authentication 인증 객체 생성
        // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
        // 이때 해당 객체는 authenticated 필드가 false로 설정된, 인증되지 않은 Authentication 객체이다.
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userId, userPassword);
        // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
        // AuthenticationManager 내 AuthenticationProvider들을 통해 인증 과정이 수행
        // authenticate() 메서드 수행 중, UserDetailsService의 loadUserByUsername() 메서드를 통해 
        // 실제 DB에 저장된 사용자 정보와 일치하는지 확인하는 로직이 수행되며, 해당 메서드는 직접 구현해주어야 한다.
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        JsonWebTokenDto jsonWebTokenDto = jwtProvider.generateToken(authentication);
        // 생성된 리프레시 토큰을 DB에 저장
        userRepository.updateRefreshToken(jsonWebTokenDto.getRefreshToken(), userId);

        return jsonWebTokenDto;
    }

    @Override
    public JsonWebTokenDto tokenRefresh(HttpServletRequest request) throws UsernameNotFoundException, TokenNotValidateException {
        JsonWebTokenDto jsonWebTokenDto = null;
        //요청데이터에서 엑세스 토큰, 리프레시 토큰을 분리
        String authorizationHeader = request.getHeader("Access-Token");
        if(StringUtils.hasText(authorizationHeader) && authorizationHeader.startsWith("Bearer")) {
            authorizationHeader = authorizationHeader.substring(7);
        } 
        String refreshTokenHeader = request.getHeader("Refresh-Token");
        if(StringUtils.hasText(refreshTokenHeader) && refreshTokenHeader.startsWith("Bearer")) {
            refreshTokenHeader = refreshTokenHeader.substring(7);
        } 
        
        //리프레시 토큰이 유효한지 확인
        jwtProvider.validateToken(refreshTokenHeader);
        //리프레시 토큰이 유효하다면, 만료된 엑세스 토큰을 이용하여 인증 정보를 가져옴.
        Authentication authentication = jwtProvider.getAuthentication(authorizationHeader);
        //인증정보를 이용해 DB상에서의 리프레시 토큰 정보와 일치하는지 확인.
        String userId = authentication.getName();
        Optional<UserEntity> userEntity = userRepository.findByUserId(userId);
        if(refreshTokenHeader.equals(userEntity.get().getRefreshToken())){
            //비교 후 맞다면 엑세스토큰, 리프레시토큰 반환
            jsonWebTokenDto = jwtProvider.generateToken(authentication);
            // 생성된 리프레시 토큰을 DB에 저장
            userRepository.updateRefreshToken(jsonWebTokenDto.getRefreshToken(), userId);
        } else {
            //비교 후 아니라면 해킹의 우려가 있으므로, 다시 로그인하라고 클라이언트에 메세지를 보낸다. (로그아웃)
            throw new TokenNotValidateException("리프레시 토큰이 일치하지 않습니다. 다시 로그인해 주세요.");
        }

        return jsonWebTokenDto;
    }

    @Override
    public void register(UserRegisterRequestDto userRegisterRequestDto) throws RuntimeException {

        if(userRepository.findByUserId(userRegisterRequestDto.getUserId()).isPresent()){
            throw new RuntimeException(userRegisterRequestDto.getUserId() + "는 이미 존재하는 아이디입니다.");
        } else {
            UserEntity userEntity = UserEntity.builder()
                                        .userId(userRegisterRequestDto.getUserId())
                                        .userPassword(encode.encode(userRegisterRequestDto.getUserPassword()))
                                        .userEmail(userRegisterRequestDto.getUserEmail())
                                        .adultStatus(userRegisterRequestDto.isAdultStatus())
                                        .emailAgreement(userRegisterRequestDto.isEmailAgreement())
                                        .privacyAgreement(userRegisterRequestDto.isPrivacyAgreement())
                                        .smsAgreement(userRegisterRequestDto.isSmsAgreement())
                                        .refreshToken(null)
                                        .profiles(null).build();
    
            userRepository.save(userEntity);
        }
        
    }
    
    @Override
    public UserDto editInfo(String userId, UserEditRequestDto userEditRequestDto) throws IllegalArgumentException{
        Optional<UserEntity> userEntity = userRepository.findById(userId);
        if(userEntity.isPresent()) {
            userEntity.get().update(userEditRequestDto);
            return new UserDto(userEntity.get());
        } else{
            throw new IllegalArgumentException("해당 회원이 존재하지 않습니다.");
        }
    }

    @Override
    public void editPassword(String userId, UserEditPasswordRequestDto userEditPasswordRequestDto) throws IllegalArgumentException {
        Optional<UserEntity> userEntity = userRepository.findById(userId);
        if(encode.matches(userEditPasswordRequestDto.getCurrentPassword(), userEntity.get().getUserPassword())){
            userRepository.updateUserPassword(encode.encode(userEditPasswordRequestDto.getChangePassword()), userId);
        } else {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
    }

    @Override
    public void delete(String userId) throws IllegalArgumentException {
        
        //로그인한 아이디가 DB에 존재하는지 확인.
        Optional<UserEntity> userEntity = userRepository.findById(userId);
        //존재한다면 그 아이디를 삭제.
        if(userEntity.isPresent()) {
            userRepository.deleteById(userId);
        } else{
            throw new IllegalArgumentException("해당 회원이 존재하지 않습니다.");
        }
        
    }

    

}
