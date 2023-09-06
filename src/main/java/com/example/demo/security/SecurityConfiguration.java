package com.example.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.servlet.configuration.WebMvcSecurityConfiguration;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.DefaultSecurityFilterChain;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration{
	  @Autowired
	    private DataSource dataSource;

	    @Bean
	    public JdbcUserDetailsManager userDetailsManager() {
	        JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);
	        jdbcUserDetailsManager.setUsersByUsernameQuery("SELECT id_user, password, 1 as enabled FROM users WHERE id_user = ?");
	        jdbcUserDetailsManager.setAuthoritiesByUsernameQuery("SELECT id_user as participant, role as credentials FROM roles WHERE id_user = ?");
	        jdbcUserDetailsManager.setRolePrefix("ROLE_"); // Optional: Set a prefix for roles if needed

	        return jdbcUserDetailsManager;
	    }
	
@Bean
public DefaultSecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity.httpBasic();
        httpSecurity.authorizeHttpRequests(configurer->
                configurer.requestMatchers(HttpMethod.POST,"/SaveOperation").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET,"/**").hasRole("USER")
                .requestMatchers(HttpMethod.GET,"/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET,"/Consulter/**").hasRole("USER")
                .requestMatchers(HttpMethod.GET,"/Consulter/**").hasRole("ADMIN")
                );
        httpSecurity.formLogin();
        return httpSecurity.build();
}

    // Additional security configurations, user details service, etc.
}
