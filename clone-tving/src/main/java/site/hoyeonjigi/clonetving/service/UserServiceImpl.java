package site.hoyeonjigi.clonetving.service;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import site.hoyeonjigi.clonetving.common.JwtProvider;
import site.hoyeonjigi.clonetving.domain.UserEntity;
import site.hoyeonjigi.clonetving.dto.JsonWebTokenDto;
import site.hoyeonjigi.clonetving.dto.UserRegisterRequestDto;
import site.hoyeonjigi.clonetving.repository.UserRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final BCryptPasswordEncoder encoder;
    private final UserRepository userRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtProvider jwtProvider;

    @Override
    public JsonWebTokenDto login(String userId, String userPassword) throws Exception {
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
        userRepository.updateRefreshToken(jsonWebTokenDto.getRefreshToken(), userId);

        return jsonWebTokenDto;
    }

    @Override
    public void register(UserRegisterRequestDto userRegisterRequestDto) throws Exception {

        if(userRepository.findByUserId(userRegisterRequestDto.getUserId()).isPresent()){
            throw new RuntimeException(userRegisterRequestDto.getUserId() + "는 이미 존재하는 아이디입니다.");
        } else {
            UserEntity userEntity = UserEntity.builder()
                                        .userId(userRegisterRequestDto.getUserId())
                                        .userPassword(encoder.encode(userRegisterRequestDto.getUserPassword()))
                                        .userEmail(userRegisterRequestDto.getUserEmail())
                                        .adultStatus(userRegisterRequestDto.isAdultStatus())
                                        .emailAgreement(userRegisterRequestDto.isEmailAgreement())
                                        .privacyAgreement(userRegisterRequestDto.isPrivacyAgreement())
                                        .smsAgreement(userRegisterRequestDto.isSmsAgreement())
                                        .profiles(null).build();
    
            userRepository.save(userEntity);
        }
        
    }
    
}
