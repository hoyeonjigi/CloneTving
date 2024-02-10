package site.hoyeonjigi.clonetving.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor 
@Builder
public class UserEditPasswordRequestDto {
    private String currentPassword;
    private String changePassword;
}
