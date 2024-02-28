package site.hoyeonjigi.clonetving.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileDto {

    @NotEmpty
    private String profileName;

    private String updateProfileName;

    private String imageName;

    private Boolean child;

}
