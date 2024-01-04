package site.hoyeonjigi.clonetving.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "profile_image")
@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class ProfileImageEntity {
    
    @Id
    private String imageId;

    @Column(length=20, nullable=false)
    private String imageName;

    @Column(nullable=false)
    private byte[] imageBlob;

    @OneToMany(mappedBy = "profileImage", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ProfileEntity> profiles = new ArrayList<>();
}
